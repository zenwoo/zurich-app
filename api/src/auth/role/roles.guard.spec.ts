import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const mockReflector = {
    getAllAndOverride: jest.fn()
  };

  const mockExecutionContext: Partial<ExecutionContext> = {
    getClass: jest.fn(),
    getHandler: jest.fn(),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        user: { roles: ['Admin'] }
      })
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector
        }
      ]
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(new RolesGuard(reflector)).toBeDefined();
  });

  it('should allow access if no roles are required', () => {
    mockReflector.getAllAndOverride.mockReturnValue(null);

    const result = guard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(true);
  });

  it('should allow access if user has the required roles', () => {
    mockReflector.getAllAndOverride.mockReturnValue(['Admin']);

    const result = guard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(true);
  });

  it('should deny access if user does not have the required roles', () => {
    mockReflector.getAllAndOverride.mockReturnValue(['User']);

    const result = guard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(false);
  });

  it('should deny access if user roles are not defined', () => {
    const emptyMockExecutionContext: Partial<ExecutionContext> = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          user: { roles: [] }
        })
      })
    };

    mockReflector.getAllAndOverride.mockReturnValue(['Admin']);
    const result = guard.canActivate(
      emptyMockExecutionContext as ExecutionContext
    );
    expect(result).toBe(false);
  });
});
