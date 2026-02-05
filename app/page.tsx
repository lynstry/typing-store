import { client } from "@/src/lib/apollo-client";
import { GET_PRODUCTS } from "@/src/lib/queries";
import { ProductCard } from "@/components/product-card";
import { gql } from "@apollo/client";
import GradientText from "@/components/GradientText";

interface WCProduct {
  id: string;
  databaseId: number;
  name: string;
  price?: string;
  image?: {
    sourceUrl: string;
  };
}

async function getProducts(search?: string) {
  try {
    const { data } = await client.query<{ products: { nodes: WCProduct[] } }>({
      query: gql(GET_PRODUCTS),
      variables: { search: search || null },
      fetchPolicy: "no-cache"
    });
    return data?.products?.nodes || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const products = await getProducts(search);

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center gap-2 mb-12">
          <GradientText
            className="text-6xl font-bold tracking-tight text-center py-2"
            colors={["#ffbb29","#f16fc8","#3d0cdf"]}
            animationSpeed={6}
            showBorder={false}
          >
            {search ? `Results for "${search}"` : "Typing Store"}
          </GradientText>
          <p className="text-muted-foreground text-center text-xl mt-4">
            {search 
              ? `Found ${products.length} product${products.length === 1 ? "" : "s"}` 
              : "Best budget gear for your setup."}
          </p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-32 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02]">
            <p className="text-xl text-muted-foreground">
              {search 
                ? "No products match your search. Try different keywords." 
                : "No products found. Check your WooCommerce connection."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: WCProduct) => {
              // Extract numeric value from price string (e.g., "₴1,200.00" or "100,00")
              // 1. Remove currency symbols and spaces
              // 2. Identify if it's a comma-decimal format or dot-decimal
              const rawPrice = product.price || "0";
              const cleanPrice = rawPrice.replace(/[^\d.,]/g, "");
              
              let parsedPrice = 0;
              if (cleanPrice.includes(",") && cleanPrice.includes(".")) {
                // Thousands separator present, remove it
                if (cleanPrice.indexOf(",") > cleanPrice.indexOf(".")) {
                  // Format like 1.234,56
                  parsedPrice = parseFloat(cleanPrice.replace(/\./g, "").replace(",", "."));
                } else {
                  // Format like 1,234.56
                  parsedPrice = parseFloat(cleanPrice.replace(/,/g, ""));
                }
              } else if (cleanPrice.includes(",")) {
                // Comma only, likely decimal: 100,00 -> 100.00
                parsedPrice = parseFloat(cleanPrice.replace(",", "."));
              } else {
                parsedPrice = parseFloat(cleanPrice);
              }

              return (
                <ProductCard key={product.id} product={{
                  id: product.databaseId.toString(),
                  name: product.name,
                  price: parsedPrice,
                  image: product.image?.sourceUrl || "/placeholder.svg",
                  category: "All"
                }} />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
