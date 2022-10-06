import ProductList from "@components/product-list";
import { Product } from "@prisma/client";
import type { NextPage } from "next";

import useSWR from "swr";
import Item from "../../components/item";
import Layout from "../../components/layout";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
