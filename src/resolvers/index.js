const feedResolver = async (parent, args, context) => {
  return context.prisma.link.findMany();
}

const createLinkResolver = async (parent, args, context) => {
  const { description, url } = args || {};
  const newLink = await context.prisma.link.create({ data: { description, url } });
  context.pubsub.publish("NEW_LINK", newLink);
  return newLink;
}

const updateLinkResolver = async (parent, args, context) => {
  const { description, url, id } = args || {};
  const updatedLink = await context.prisma.link.update({
    where: {
      id: Number(id),
    },
    data: {
      description,
      url
    }
  })
  return updatedLink;
}

const deleteLinkResolver = async (parent, args, context) => { 
  const { id } = args || {};
  const deletedLink = await context.prisma.link.delete({
    where: {
      id: Number(id)
    }
  });
  return deletedLink;
}

module.exports = {
  feedResolver,
  createLinkResolver,
  updateLinkResolver,
  deleteLinkResolver
}