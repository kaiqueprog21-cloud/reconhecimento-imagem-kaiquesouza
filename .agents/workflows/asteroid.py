import pygame
import random
from settings import *

class Asteroid(pygame.sprite.Sprite):
    def __init__(self, speed_multiplier=1.0):
        super().__init__()
        # Tamanho aleatório para o asteroide
        size = random.randint(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE)
        self.image = pygame.Surface((size, size))
        self.image.fill(ASTEROID_COLOR)
        self.rect = self.image.get_rect()
        
        # Posição inicial no topo da tela, em um X aleatório
        self.rect.x = random.randint(0, WIDTH - self.rect.width)
        self.rect.y = random.randint(-100, -40)
        
        # Velocidade de queda escalonada pelo multiplicador de dificuldade
        base_speed = random.randint(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED)
        self.speedy = base_speed * speed_multiplier

    def update(self):
        self.rect.y += self.speedy
        # Se passar do fundo da tela, a gente trata a colisão lá no game.py (game over)
