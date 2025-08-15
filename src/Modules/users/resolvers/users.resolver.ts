import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { UserDetails } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Resolver(() => UserDetails)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDetails)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserDetails], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserDetails, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserDetails)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserDetails)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
