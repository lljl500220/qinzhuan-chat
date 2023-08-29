import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendMessage {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: string;

  @Column()
  room: string;

  @Column()
  username: string;

  @Column()
  content: string;

  @Column()
  messageType: string;

  @Column()
  time: string;
}
