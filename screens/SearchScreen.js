//import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
//import React, { useEffect, useState } from "react";
//import { Feather } from "@expo/vector-icons";
//import SearchResults from "../components/SearchResults";
//import { collection, getDocs } from "firebase/firestore";
//import { db } from "../firebase";


import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path

const SearchScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const colRef = collection(db, "places");
        const querySnapshot = await getDocs(colRef);
        
        // Map the documents into a clean array
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setItems(data);
      } catch (error) {
        console.error("Error fetching all data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // Empty dependency array = Runs once on mount

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>All Places:</Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            {/* Replace 'name' with whatever field exists in your DB */}
            <Text style={{ fontSize: 16 }}>{item.name || "Unnamed Place"}</Text>
            <Text style={{ color: 'gray' }}>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};


/*const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]); // Master list from Firebase
  const [filteredItems, setFilteredItems] = useState([]); // What the user sees

  console.log(items);
  // 1. Fetch data ONCE when screen opens
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const colRef = collection(db, "places");
        const docsSnap = await getDocs(colRef);
        const tempItems = [];
        docsSnap.forEach((doc) => {
          tempItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(tempItems);
        setFilteredItems(tempItems);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchProducts();
  }, []); // Empty array means run only once

  // 2. Filter data whenever the 'input' changes
  useEffect(() => {
    if (input.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [input, items]);

/*const SearchScreen = () => {
  const [input, setInput] = useState("");

  const [items, setItems] = useState([]);

  console.log("items = " + items);
  useEffect(() => {
    if (items.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "places");

      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        console.log("debugging doc = ");
        items.push(doc.data());
      });
    };

    fetchProducts();
  }, [items]);
  console.log(items);
  return (
    <SafeAreaView style={{ marginTop: 60 }}>
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
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResults data={items} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;*/

const styles = StyleSheet.create({});
