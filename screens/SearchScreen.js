// import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Feather } from "@expo/vector-icons";
// import SearchResults from "../components/SearchResults";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const SearchScreen = () => {
//   const [input, setInput] = useState("");

//   const [items, setItems] = useState([]);

//   console.log("items = ", items);
//   useEffect(() => {
//     if (items.length > 0) return;

//     const fetchProducts = async () => {
//       const colRef = collection(db, "Rooms");

//       const docsSnap = await getDocs(colRef);
//       docsSnap.forEach((doc) => {
//         console.log("For each doc = ", doc);
//         items.push(doc.data());
//       });
//     };

//     fetchProducts();
//   }, [items]);
//   console.log(items);
//   return (
//     <SafeAreaView style={{ marginTop: 60 }}>
//       <View
//         style={{
//           padding: 10,
//           margin: 10,
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//           borderColor: "#FFC72C",
//           borderWidth: 4,
//           borderRadius: 10,
//         }}
//       >
//         <TextInput
//           value={input}
//           onChangeText={(text) => setInput(text)}
//           placeholder="Enter Your Destination"
//         />
//         <Feather name="search" size={22} color="black" />
//       </View>

//       <SearchResults data={items} input={input} setInput={setInput} />
//     </SafeAreaView>
//   );
// };

// export default SearchScreen;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        if (items.length > 0) return;

        const colRef = collection(db, "Rooms"); // Ensure collection name matches Firestore
        const docsSnap = await getDocs(colRef);
        
        const fetchedItems = [];
        docsSnap.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{ marginTop: 60, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#FFC72C",
          borderWidth: 4,
          borderRadius: 10,
        }}
      >
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter Your Destination"
          style={{ flex: 1 }}
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResults 
        data={items} 
        input={input} 
        setInput={setInput} 
        navigation={navigation} 
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
