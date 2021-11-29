import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { Formik } from "formik";

import { TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import DropDownPicker from "react-native-dropdown-picker";

import {
  setistrans,
  setmodalLoading,
  setStockData,
  setupdate,
} from "../../../../../store/stocks";
import { getDataStock, updateStock } from "../../../../../services/stocks";
// c'est le modal pour faire de transfert du stock 
export default function ModalAdd({  }) {
  const state = useSelector((state) => state.stockState);
  const dispatch = useDispatch();

  const [categorie, setcat] = useState(null);
  const [sscategorie, setsscat] = useState(null);
  const [ville1, setville1] = useState(null);
  const [ville2, setville2] = useState(null);

  const authState = useSelector((state) => state.authState);

  const [villes, setstates] = useState([
    { id: "1", label: "Paris", value: "Paris" },
    { id: "2", label: "Marseille", value: "Marseille" },
    { id: "3", label: "Lille", value: "Lille" },
    { id: "4", label: "Dijon", value: "Dijon" },
    { id: "5", label: "Nice", value: "Nice" },
  ]);
  const [categories, setstates2] = useState([
    { id: "1", label: "A", value: "A" },
    { id: "2", label: "B", value: "B" },
    { id: "3", label: "AB", value: "AB" },
    { id: "4", label: "O", value: "O" },
    
  ]);
  const [souscategories, setstates02] = useState([
    { id: "1", label: "Plus", value: "Plus" },
    { id: "2", label: "Moins", value: "Moins" },
    
    
  ]);
  // cette fonction est  utilisé pour la mise à jour de stock 
  const getAlltheStock = ()=>{
    getDataStock({}, authState.userToken).then((response) => {
      console.log(response.data);
      dispatch(setStockData(response.data.stock));
      dispatch(setistrans(false));
      
    }).catch((error) => {
      console.log(error.response);
    });
  }
  //cette fonction permet de tranférer de fruit
  const updatebloodstock = (data) => {
    updateStock(data, authState.userToken)
      .then((response) => {
        console.log("response", response.data);
        
        dispatch(setistrans(false))
        dispatch(setmodalLoading(false));
        dispatch(setupdate(true))
        //getAlltheStock();
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <Formik
      initialValues={{
        quantity: "",
      }}
      onSubmit={(values) => {
        dispatch(setmodalLoading(true));
        var data = {
          ville1: ville1,
          ville2: ville2,
          categorie: categorie,
          souscategorie:sscategorie,
          quantity: parseInt(values.quantity),
        };
        updatebloodstock(data);
      }}
      //validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            Ville de départ:
          </Text>
          <View>
            <DropDownPicker
              items={villes}
              defaultValue={null}
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setville1(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            Ville d'arrivé:
          </Text>
          <View>
            <DropDownPicker
              items={villes}
              defaultValue={null}
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setville2(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              width: 300,
              marginLeft: 5,
            }}
          >
            Catégorie du sang:
          </Text>
          <View>
            <DropDownPicker
              items={categories}
              defaultValue={null}
             
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setcat(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              width: 300,
              marginLeft: 5,
            }}
          >
            Sous catégorie:
          </Text>
          <View>
            <DropDownPicker
              items={souscategories}
              defaultValue={null}
             
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setsscat(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginLeft: 5,
              marginTop: 3,
            }}
          >
            Quantité à transférer:
          </Text>
          <TextInput
            placeholder=""
            style={StyledInput.formInput}
            onChangeText={handleChange("quantity")}
            value={values.quantity}
          ></TextInput>

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Button
              mode="contained"
              loading={state.modalLoading}
              onPress={handleSubmit}
            >
              {"Transférer"}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}
const StyledInput = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TO_Date_AdvancedResearch: {
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    height: 45,
    paddingLeft: 15,
    flexDirection: "row",
    width: 300,
  },
  validationText: {
    marginTop: 8,
    marginBottom: 8,
    color: "red",
  },
  formInput: {
    width: 300,
    height: 45,
    
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#F3F3F3",
  },
});
