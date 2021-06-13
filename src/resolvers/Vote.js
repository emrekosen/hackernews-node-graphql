export const link = async (parent, _, ctx) => {
  return ctx.prisma.vote.findUnique({ where: { id: parent.id } }).link();
};

export const user = (parent, _, ctx) => {
  return ctx.prisma.vote.findUnique({ where: { id: parent.id } }).user();
};
