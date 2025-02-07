import { db } from "@/../prisma";

const fetchSiteInfo = async () => {
  const info = await db.siteSetting.findFirst({
    where: {},
  });

  return info || null;
};

export default fetchSiteInfo;
