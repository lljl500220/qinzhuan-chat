import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ default: 'qinzhuan' })
  username: string;

  @Column({ default: '123456', select: false })
  password: string;

  @Column({ default: 'qinzhuan.png' })
  avatar: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 'on' })
  status: string;

  @Column({ default: '' })
  tag: string;

  @Column({ type: 'double', default: new Date().valueOf() })
  createTime: number;
}
