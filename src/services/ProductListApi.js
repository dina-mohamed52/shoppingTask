import { supabase } from "../Supabase";

export const fetchProductList = async () => {
    let { data, error } = await supabase
  .from('products')
  .select('*')
  
    console.log('Dataaaaaaaaaaaaaaaaaaaaa:', data);
    console.log('Error:', error);
  
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  
    return data;
  };
  