import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
  }
  async create(createProjectDto: CreateProjectDto) {
    const isUnique = await this.isKeyUnique(createProjectDto.key);
    if (!isUnique) {
      throw new BadRequestException('Key is already in use.');
    }
    try {
      const project = await this.projectRepository.save(createProjectDto);
      return {
        message: 'Project created successfully',
        user: project,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create project.');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new BadRequestException('Project not found.');
    }
    if (updateProjectDto.key && updateProjectDto.key !== project.key) {
      const isUnique = await this.isKeyUnique(updateProjectDto.key);
      if (!isUnique) {
        throw new BadRequestException('Key is already in use.');
      }
    }
    Object.assign(project, updateProjectDto);
    try {
      const updatedProject = await this.projectRepository.save(project);
      return {
        message: 'Project updated successfully',
        project: updatedProject,
      };
    } catch (error) {
      throw new BadRequestException('Failed to update project.');
    }
  }
  async isKeyUnique(key: string): Promise<boolean> {
    const project = await this.projectRepository.findOneBy({key});
    return !project;
  }
}
