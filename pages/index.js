import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";




export default function Home({featuredProduct, newProducts, collectionProduct }) {
  return <>
  <Hero product={featuredProduct} />
  <hr class="my-4 h-px border-0 bg-gray-300" />

  <Products products={newProducts} />
  <hr class="my-4 h-px border-0 bg-gray-300" />

  <Collection product={collectionProduct} />


  </>
}

export async function getServerSideProps() {
  await mongooseConnect();

  const featuredId = '660685a3bf86b71ebbb81348'
  const collectionId = '660685a3bf86b71ebbb81348'

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, { sort: { '_id': 1 }, limit: 5 });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)), 
      collectionProduct: JSON.parse(JSON.stringify(collectionProduct)),
    }
  };
}

