// components/ThemeCard.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function ThemeCard({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{
      marginTop: 12,
      padding: 14,
      borderRadius: 12,
      backgroundColor: "rgba(255,255,255,0.02)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.04)"
    }}>
      <Text style={{ color: "#fff", fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );
}
