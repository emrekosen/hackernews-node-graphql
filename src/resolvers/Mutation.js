import { APP_SECRET, getUserId } from "../utils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (parent, { email, password, name }, ctx, info) => {
  const hash = await bcrypt.hash(password, 10);

  const user = await ctx.prisma.user.create({
    data: {
      email,
      password: hash,
      name,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

export const login = async (parent, { email, password }, ctx, info) => {
  const user = await ctx.prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

export const post = async (parent, { url, description }, ctx, info) => {
  const { userId } = ctx;
  if (!userId) throw Error("Authorization needed!");

  const newLink = await ctx.prisma.link.create({
    data: {
      url,
      description,
      postedBy: { connect: { id: userId } },
    },
  });

  ctx.pubsub.publish("NEW_LINK", newLink);

  return newLink;
};

export const vote = async (parent, { linkId }, ctx, info) => {
  const userId = getUserId(ctx);

  const vote = await ctx.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(linkId),
        userId: userId,
      },
    },
  });

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${linkId}`);
  }

  const newVote = ctx.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(linkId) } },
    },
  });

  ctx.pubsub.publish("NEW_VOTE", newVote);
  return newVote;
};

const a = () => {
  fetch("http://localhost:8080/api/v1/clubber/clubManagement", {
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => {
    response.json().then((data) => {
      console.log(data);
      this.setState({ groups: data.body, isLoading: false });
    });
  });
};
