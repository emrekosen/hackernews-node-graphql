export const links = async (parent, _, ctx) => {
  return ctx.prisma.user.findUnique({ where: { id: parent.id } }).links();
};
