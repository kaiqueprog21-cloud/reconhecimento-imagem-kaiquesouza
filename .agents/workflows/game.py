import pygame
import sys
from settings import *
from player import Player
from asteroid import Asteroid
from projectile import Projectile

# Inicialização do Pygame
pygame.init()
pygame.font.init()

# Configuração da tela
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Atari Space Shooter")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 30)

def draw_text(text, font, color, surface, x, y):
    textobj = font.render(text, True, color)
    textrect = textobj.get_rect()
    textrect.topleft = (x, y)
    surface.blit(textobj, textrect)

def main():
    # Grupos de sprites
    all_sprites = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    projectiles = pygame.sprite.Group()

    # Criação do jogador
    player = Player()
    all_sprites.add(player)

    score = 0
    frame_count = 0
    running = True
    game_over = False
    level = 1

    while running:
        # Controle de FPS
        clock.tick(FPS)

        # Processamento de Eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if event.type == pygame.KEYDOWN and not game_over:
                if event.key == pygame.K_SPACE:
                    player.shoot(all_sprites, projectiles)
            
            # Reiniciar o jogo se pressionar R após game over
            if event.type == pygame.KEYDOWN and game_over:
                if event.key == pygame.K_r:
                    main() # Reinicia a função main
                    return # Encerra o loop atual

        if not game_over:
            # Cálculo de dificuldade baseado na pontuação
            level = 1 + score // DIFFICULTY_STEP
            speed_multiplier = 1.0 + (level - 1) * 0.25          # +25% de velocidade por nível
            spawn_rate = max(SPAWN_RATE_MIN, SPAWN_RATE_INITIAL - (level - 1) * 8)  # spawn mais rápido por nível

            # Geração de Asteroides
            frame_count += 1
            if frame_count % spawn_rate == 0:
                asteroid = Asteroid(speed_multiplier=speed_multiplier)
                all_sprites.add(asteroid)
                asteroids.add(asteroid)

            # Atualização de Sprites
            all_sprites.update()

            # Verificação de colisões
            
            # 1. Projétil atinge Asteroide
            # O último 'True, True' significa que ambos serão deletados na colisão
            hits = pygame.sprite.groupcollide(asteroids, projectiles, True, True)
            for hit in hits:
                score += 10

            # 2. Asteroide atinge o fundo da tela
            for asteroid in asteroids:
                if asteroid.rect.top > HEIGHT:
                    game_over = True
                    asteroid.kill()

            # 3. Asteroide atinge o jogador
            if pygame.sprite.spritecollide(player, asteroids, False):
                game_over = True

        # Renderização (Desenho)
        screen.fill(BLACK)
        all_sprites.draw(screen)
        
        # Desenhar Pontuação e Nível
        draw_text(f"Score: {score}", font, WHITE, screen, 10, 10)
        draw_text(f"Nível: {level}", font, WHITE, screen, 10, 40)

        if game_over:
            draw_text("GAME OVER", font, RED, screen, WIDTH // 2 - 80, HEIGHT // 2 - 20)
            draw_text("Pressione R para reiniciar", font, WHITE, screen, WIDTH // 2 - 140, HEIGHT // 2 + 20)

        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
