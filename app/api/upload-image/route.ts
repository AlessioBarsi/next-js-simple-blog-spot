import { NextRequest, NextResponse } from 'next/server';
import { unlink, writeFile } from 'fs/promises';
import path from 'path';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  //@ts-ignore
  const userId = parseInt(formData.get('userId'));


  if (!file || !userId) {
    return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExt = file.name.split('.').pop();
  const fileName = `avatar_${Date.now()}.${fileExt}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  try {
    await writeFile(path.join(uploadDir, fileName), buffer);
    //Get user and check if they have an avatar
    const findUser = await prisma.user.findFirstOrThrow({
      where: { id: userId }
    })

    if (findUser.picture) {
      //Delete old image
      const oldImagePath = path.join(process.cwd(), 'public', findUser.picture);
      try {
        await unlink(oldImagePath);
        console.log(`Deleted old avatar: ${oldImagePath}`);
      } catch (err) {
        console.warn(`Failed to delete old avatar at ${oldImagePath}`, err);
        // You can choose to ignore this error or handle it
      }
    }
    // Update user picture path in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        picture: `/uploads/${fileName}`,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
