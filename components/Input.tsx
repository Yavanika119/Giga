// components/Input.tsx
import React from "react";
import { TextInput } from "react-native";

export default function Input(props: any) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#94a3b8"
      style={{
        marginTop: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "#fff",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.04)"
      }}
    />
  );
}
