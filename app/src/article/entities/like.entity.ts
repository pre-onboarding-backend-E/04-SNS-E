import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Like {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  // userId와 articleId와 1:N 연결

  //   @ApiProperty({ description: '좋아요 삭제 여부' })
  //   @Column()
  //   flag: boolean;

  @ManyToOne(() => Article, (article) => article.like, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  public article: Article;

  @ManyToOne(() => User, (user) => user.article, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user: User;
}
