const newLinkSubscribe = (parent, args, ctx, info) => {
  return ctx.pubsub.asyncIterator("NEW_LINK");
};

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

const newVoteSubscribe = (_, __, ctx, ___) => {
  return ctx.pubsub.asyncIterator("NEW_VOTE");
};

export const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => {
    return payload;
  },
};
