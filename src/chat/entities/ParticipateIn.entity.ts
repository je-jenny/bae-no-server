import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Room } from '.'
import { User } from '../../user/entities'

@Entity('participate_in')
@Unique('index_participate_relation', ['room', 'user'])
export class ParticipateIn {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('boolean', { name: 'status', default: true })
  status!: boolean

  @Column('boolean', { name: 'is_host', default: false })
  isHost!: boolean

  @Column('timestamp with time zone', {
    name: 'participate_at',
    default: () => 'now()',
  })
  participateAt!: Date

  @ManyToOne(() => Room, (room) => room.participateIn)
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  room?: Room | null

  @ManyToOne(() => User, (user) => user.participateIn)
  @JoinColumn([{ name: 'participant_id', referencedColumnName: 'id' }])
  user?: User | null

  // relation method
  static participate = (user: User | null, isHost: boolean): ParticipateIn => {
    const relation = new ParticipateIn()
    relation.user = user
    relation.isHost = isHost
    return relation
  }
}
