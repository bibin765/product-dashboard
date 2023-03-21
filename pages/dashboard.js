import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Container,
  Spacer,
  Text,
  useColorModeValue,
  HStack,
  VStack,
  Heading,
  IconButton,
  SlideFade,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Product from "../components/Product";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3001/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const response = await fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    setProducts([...products, data]);
    setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
  };

  const updateProduct = async (id, body) => {
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    fetchProducts();
    //setProducts([...products, data]);
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3001/api/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product._id !== id));
  };

  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <>
      <Box bg={bg} color={color}>
        <Container maxW="container.xl">
          <HStack py={4}>
            <IconButton
              colorScheme="blue"
              aria-label="Menu"
              icon={<HamburgerIcon />}
            />
            <Heading as="h1" size="lg">
              Product List
            </Heading>
            <Spacer />
          </HStack>
        </Container>
      </Box>

      <Container maxW="container.xl">
        <SlideFade in={true}>
          <VStack spacing={8} py={8}>
            <VStack spacing={4} w="100%">
              <FormControl id="name" mb={4}>
                <FormLabel>Product Name</FormLabel>
                <Input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="description" mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="price" mb={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="imageUrl" mb={4}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                />
              </FormControl>
              <Button colorScheme="blue" onClick={addProduct}>
                Add Product
              </Button>
            </VStack>

            <Flex flexWrap="wrap" justifyContent="space-between">
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  onDelete={deleteProduct}
                  onUpdate={updateProduct}
                />
              ))}
            </Flex>
          </VStack>
        </SlideFade>
      </Container>
    </>
  );
};

export default Dashboard;
