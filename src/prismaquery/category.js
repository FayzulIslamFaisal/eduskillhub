import { prisma } from "@/lib/prisma";


const getCategories= async()=> {
  return await prisma.category.findMany({
    select:{
      id:true,
      title:true,
      thumbnail:true,
      description:true
    }
  });
}

export default getCategories