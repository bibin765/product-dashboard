import { useRouter } from "next/router";
import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
        console.log('id', id)
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    const response = await fetch(`http://localhost:3001/api/products`);
    const data = await response.json();
    const product = data.find(p => p._id === id);
    setProduct(product);
  };

  return (
    product && (
      <Box p={8}>
        <Image src={product.imageUrl} alt={product.name} />
        <Text fontSize="2xl" fontWeight="bold" mt={4}>
          {product.name}
        </Text>
        <Text fontSize="xl" mt={2}>
          {product.description}
        </Text>
        <Text fontSize="xl" mt={2}>
          Price: ₹{product.price}
        </Text>
      </Box>
    )
  );
};

export default ProductDetails;
