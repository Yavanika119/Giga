// components/Button.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        marginTop: 16,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        backgroundColor: "#50a7ff",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
      }}
    >
      <Text style={{ color: "#081024", fontWeight: "700" }}>{label}</Text>
    </TouchableOpacity>
  );
}
