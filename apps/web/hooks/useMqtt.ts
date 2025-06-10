import type {
  MqttConnectionState,
  MqttMessage,
  MqttTopicHandler,
} from "@/lib/types";
import MQTT, { IClientOptions, MqttClient } from "mqtt";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseMqttProps {
  uri: string;
  options?: IClientOptions;
  topicHandlers?: MqttTopicHandler[];
  autoConnect?: boolean;
}

export default function useMqtt({
  uri,
  options = {},
  topicHandlers = [],
  autoConnect = true,
}: UseMqttProps) {
  const clientRef = useRef<MqttClient | null>(null);
  const topicHandlersRef = useRef<Map<string, (message: MqttMessage) => void>>(
    new Map()
  );

  const uriRef = useRef(uri);
  const optionsRef = useRef(options);

  useEffect(() => {
    uriRef.current = uri;
  }, [uri]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const [connectionState, setConnectionState] = useState<MqttConnectionState>({
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  useEffect(() => {
    topicHandlersRef.current.clear();
    topicHandlers.forEach(({ topic, handler }) => {
      topicHandlersRef.current.set(topic, handler);
    });
  }, [topicHandlers]);

  const connect = useCallback(() => {
    if (clientRef.current?.connected) return;

    setConnectionState((prev) => ({
      ...prev,
      isConnecting: true,
      error: null,
    }));

    try {
      const client = MQTT.connect(uriRef.current, optionsRef.current);
      clientRef.current = client;

      client.on("connect", () => {
        setConnectionState({
          isConnected: true,
          isConnecting: false,
          error: null,
        });

        topicHandlersRef.current.forEach((_, topic) => {
          client.subscribe(topic, (error) => {
            if (error) {
              console.error(`Error subscribing to topic ${topic}:`, error);
              setConnectionState((prev) => ({
                ...prev,
                error: `Subscription failed: ${error.message}`,
              }));
            }
          });
        });
      });

      client.on("error", (error) => {
        console.error("MQTT connection error:", error);
        setConnectionState((prev) => ({
          ...prev,
          isConnecting: false,
          error: error.message,
        }));
      });

      client.on("disconnect", () => {
        setConnectionState((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
        }));
      });

      client.on("message", (topic, payload) => {
        const handler = topicHandlersRef.current.get(topic);
        if (handler) {
          try {
            let parsedPayload;
            try {
              parsedPayload = JSON.parse(payload.toString());
            } catch {
              parsedPayload = {
                raw: payload.toString(),
                buffer: Array.from(payload),
                length: payload.length,
              };
            }

            const message: MqttMessage = {
              topic,
              payload: parsedPayload,
              timestamp: new Date().toISOString(),
            };

            handler(message);
          } catch (error) {
            console.error("Error handling MQTT message:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error creating MQTT client:", error);
      setConnectionState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : "Connection failed",
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.end();
      clientRef.current = null;
      setConnectionState({
        isConnected: false,
        isConnecting: false,
        error: null,
      });
    }
  }, []);

  const publish = useCallback(
    async (topic: string, message: string | object) => {
      if (!clientRef.current?.connected) {
        throw new Error("MQTT client is not connected");
      }

      const messageString =
        typeof message === "string" ? message : JSON.stringify(message);

      return new Promise<void>((resolve, reject) => {
        clientRef.current!.publish(topic, messageString, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    },
    []
  );

  const subscribe = useCallback(
    (topic: string, handler: (message: MqttMessage) => void) => {
      topicHandlersRef.current.set(topic, handler);

      if (clientRef.current?.connected) {
        clientRef.current.subscribe(topic, (error) => {
          if (error) {
            console.error(`Error subscribing to topic ${topic}:`, error);
          }
        });
      }
    },
    []
  );

  const unsubscribe = useCallback((topic: string) => {
    topicHandlersRef.current.delete(topic);

    if (clientRef.current?.connected) {
      clientRef.current.unsubscribe(topic);
    }
  }, []);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect]);

  return {
    client: clientRef.current,
    connectionState,
    connect,
    disconnect,
    publish,
    subscribe,
    unsubscribe,
  };
}
