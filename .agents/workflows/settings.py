# Configurações do jogo e constantes

# Configurações de Tela
WIDTH = 800
HEIGHT = 600
FPS = 60

# Cores (R, G, B)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Configurações do Jogador
PLAYER_SPEED = 5
PLAYER_WIDTH = 50
PLAYER_HEIGHT = 40
PLAYER_COLOR = GREEN

# Configurações do Projétil
PROJECTILE_SPEED = -10
PROJECTILE_WIDTH = 5
PROJECTILE_HEIGHT = 15
PROJECTILE_COLOR = YELLOW

# Configurações do Asteroide (dificuldade inicial — aumenta com a pontuação)
ASTEROID_MIN_SPEED = 1        # Velocidade mínima inicial
ASTEROID_MAX_SPEED = 3        # Velocidade máxima inicial
ASTEROID_MIN_SIZE = 20
ASTEROID_MAX_SIZE = 60
ASTEROID_COLOR = RED
SPAWN_RATE_INITIAL = 90       # Frames entre cada spawn no início (lento)
SPAWN_RATE_MIN = 20           # Limite mínimo de frames entre spawns (rápido)
DIFFICULTY_STEP = 50          # A cada quantos pontos a dificuldade aumenta
