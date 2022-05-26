// import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, Unique } from "typeorm"
// import { Room } from "."
// import { User } from "../../user/entities/User.entity"

// @Entity({name: "participate_id"})
// @Unique("index_participate_relation", ["roomId", "userId"])
// export class ParticipateIn {
//   @Column("boolean", { name: "status" })
//   status!: boolean

//   @Column("timestamp with time zone", {
//     name: "participate_at",
//     default: () => "now()",
//   })
//   participateAt!: Date

//   // @ManyToOne(() => Room, (room) => room.participateIn)
//   // @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
//   // roomId?: Room

//   // @ManyToOne(() => User, (user) => user.participateIn)
//   // @JoinColumn([{ name: "participant_id", referencedColumnName: "id" }])
//   // userId?: User

// }
