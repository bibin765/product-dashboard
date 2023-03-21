import React, { useState } from "react";
import { Box, Image, Text, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import printQr from "./PrintQr";

const Product = ({ product, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const qrData = `http://localhost:3000/product/${product._id}`;

  const saveUpdate = () => {
    console.log('updates', updatedProduct, product._id)
    const data = {...updatedProduct}
    delete data._id;
    onUpdate(product._id, data);
    setEditMode(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      {editMode ? (
        <>
          <FormControl id="name" mb={4}>
            <FormLabel>Product Name</FormLabel>
            <Input
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={updatedProduct.description}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
            />
          </FormControl>
          <FormControl id="price" mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            />
          </FormControl>
          <FormControl id="imageUrl" mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              value={updatedProduct.imageUrl}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
            />
          </FormControl>
          <Button colorScheme="green" mr={4} onClick={saveUpdate}>
            Save
          </Button>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Image src={product.imageUrl} alt={product.name} />
          <Text fontWeight="bold" mt={2}>{product.name}</Text>
          <Text mt={2}>{product.description}</Text>
          <Text mt={2}>Price: ₹{product.price}</Text>
          <Button colorScheme="blue" mt={4} mr={4} onClick={() => setEditMode(true)}>
            Edit
          </Button>
          <Button colorScheme="red" mt={4} mr={4} onClick={() => onDelete(product._id)}>
            Delete
          </Button>
          <Button colorScheme="blue" mt={4} onClick={() => printQr(qrData, product.name)}>
            Print QR
          </Button>
        </>
      )}
    </Box>
  );
};

export default Product;
