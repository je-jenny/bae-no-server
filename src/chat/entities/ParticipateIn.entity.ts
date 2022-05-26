import { Column, Entity, JoinColumn, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm'
import { Room } from '.'
import { User } from '../../user/entities'

@Entity('participate_in', { schema: 'public' })
@Unique('index_participate_relation', ['roomId', 'userId'])
export class ParticipateIn {

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('boolean', { name: 'status' })
  status!: boolean

  @Column('timestamp with time zone', {
    name: 'participate_at',
    default: () => 'now()',
  })
  participateAt!: Date

  @ManyToOne(() => Room, (room) => room.participateIn)
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  roomId?: Room

  @ManyToOne(() => User, (user) => user.participateIn)
  @JoinColumn([{ name: 'participant_id', referencedColumnName: 'id' }])
  userId?: User
}
