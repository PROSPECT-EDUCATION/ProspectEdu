import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Akshat Agrawal",
      phone: "9407307073",
      address: "Bhopal Bypass Road",
      state: "MADHYA PRADESH",
      country: "INDIA",
      pincode: "462038",
    }
  ]);

  const addAddress = (newAddress) => {
    setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, removeAddress }}>
      {children}
    </AddressContext.Provider>
  );
};


export const useAddress = () => useContext(AddressContext);
