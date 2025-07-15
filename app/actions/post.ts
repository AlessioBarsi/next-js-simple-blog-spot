'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deletePost(postId: number) {
  await prisma.post.delete({
    where: { id: postId },
  });
  revalidatePath('/posts');
}

export async function fetchPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc', // Sort by newest first
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        }
      },
      genre: {
        select: {
          name: true,
        }
      },
    },
  });
  return posts;
}

export async function fetchPostsByCategory(categoryName: string) {

  const category = await prisma.category.findUnique({
    where: {
      name: categoryName.toLocaleLowerCase(),
    }
  });

  if (!category) return false;

  const posts = await prisma.post.findMany({
    where: {
      categoryId: category.id
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        }
      },
      genre: {
        select: {
          name: true,
        }
      },
    },
  });
  if (posts.length == 0) return false;
  return posts;
}

export async function fetchPostsByGenre(genreName: string) {

  const genre = await prisma.genre.findUnique({
    where: {
      name: genreName.toLocaleLowerCase(),
    }
  });

  if (!genre) return false;

  const posts = await prisma.post.findMany({
    where: {
      genreId: genre.id
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        }
      },
      genre: {
        select: {
          name: true,
        }
      },
    },
  });
  if (posts.length == 0) return false;
  return posts;
}

export async function fetchPostsByAuthor(author: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: author
    },
  });

  if (!user) return false;

  const posts = await prisma.post.findMany({
    where: {
      createdBy: author
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        }
      },
      genre: {
        select: {
          name: true,
        }
      },
    },
  });
  if (posts.length == 0) return false;
  return posts;
}

export async function fetchPost(postId: number) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        }
      },
      genre: {
        select: {
          name: true,
        }
      },
    },
  });

  return post;
}

export async function createPost(formData: {
  title: string,
  content: string,
  description: string,
  categoryId: number,
  genreId: number,
  image: string | null,
}, userId: number) {
  const { title, content, description, categoryId, genreId, image } = formData;
  const createdBy = userId;
  await prisma.post.create({
    data: {
      title,
      content,
      description,
      genreId,
      categoryId,
      image,
      createdBy,
    },
  });

  revalidatePath('/posts');
}

export async function updatePost(formData: {
  title: string,
  content: string,
  description: string,
  categoryId: number,
  genreId: number,
  image: string | null,
}, postId: number) {
  const { title, content, description, categoryId, genreId, image } = formData;
  await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      title,
      content,
      description,
      genreId,
      categoryId,
      image,
    },
  });

  revalidatePath('/posts');
}