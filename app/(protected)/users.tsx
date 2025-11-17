// // app/(admin)/users.tsx
// import React, { useEffect, useState } from "react";
// import { SafeAreaView, Text, FlatList } from "react-native";
// import { userApi } from "../../src/api/userApi";

// export default function UsersScreen() {
//   const [users, setUsers] = useState<any[]>([]);

//   useEffect(() => {
//     let mounted = true;
//     userApi.list().then(res => {
//       if (mounted) setUsers(res.data || []);
//     }).catch(()=>{});
//     return () => { mounted = false; };
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#081024", padding: 20 }}>
//       <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Users</Text>
//       <FlatList
//         data={users}
//         keyExtractor={(u) => String(u.id)}
//         renderItem={({ item }) => (
//           <Text style={{ color: "#cbd5e1", paddingVertical: 8 }}>{item.username || item.email}</Text>
//         )}
//         ListEmptyComponent={<Text style={{ color: "#cbd5e1", marginTop: 12 }}>No users</Text>}
//       />
//     </SafeAreaView>
//   );
// }
