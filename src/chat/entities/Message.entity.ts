import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Room } from '.'
import { User } from '../../user/entities'

@Entity('messages', { schema: 'public' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'contents', length: 128 })
  contents!: string

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt!: Date

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  room!: Room

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user!: User
}
