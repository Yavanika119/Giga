// app/(admin)/theme.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";
import ThemeCard from "../../components/ThemeCard";
import { themeApi } from "../../src/api/themeApi";

export default function ThemeScreen() {
  const [themes, setThemes] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    themeApi.getTheme().then(res => {
      if (mounted) setThemes(res.data || []);
    }).catch(()=>{});
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#081024", padding: 20 }}>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Theme Manager</Text>
      <FlatList
        data={themes}
        keyExtractor={(item) => String(item.id || item.name)}
        renderItem={({ item }) => <ThemeCard title={item.name || "Theme"} />}
        ListEmptyComponent={<Text style={{color:"#cbd5e1", marginTop:20}}>No themes</Text>}
      />
    </SafeAreaView>
  );
}
