export const postedBy = async (parent, args, ctx) => {
  return ctx.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
};

export const votes = async (parent, args, ctx) => {
  return ctx.prisma.link.findUnique({ where: { id: parent.id } }).votes();
};
