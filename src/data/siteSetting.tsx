import { db } from "@/lib/prisma";

const fetchSiteInfo = async () => {
  const info = await db.siteSetting.findFirst({
    where: {},
  });

  return info || null;
};

export default fetchSiteInfo;
