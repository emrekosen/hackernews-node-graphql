export const feed = async (
  parent,
  { filter, skip, take, orderBy },
  ctx,
  info
) => {
  const where = filter
    ? {
        OR: [
          { description: { contains: filter } },
          { url: { contains: filter } },
        ],
      }
    : {};
  const links = await ctx.prisma.link.findMany({ where, skip, take, orderBy });

  const count = await ctx.prisma.link.count({ where });
  return {
    links,
    count,
  };
};
