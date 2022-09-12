const newLinkSubscribe = (parent, args, context, info) => {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newLinkResolver = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload
  }
}

module.exports = {
  newLinkResolver
}
