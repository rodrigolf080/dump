#lang racket/gui

(require 2htdp/image)
(require 2htdp/universe)
(require lang/posn)



;------------------------------------------------------------
; defining structures for the objects in use
(define-struct gen-world (pad1 pad2 ball))
(define-struct gen-pad (x y))
(define-struct gen-ball (x y))
;------------------------------------------------------------
; measures of the objects in use
(define pad-width 20)
(define pad-height 80)
(define window-width 600)
(define window-height 400)
(define ball-radius 12)
(define ball-speed 20)
(define pad-speed 20)

;------------------------------------------------------------
; generate structures for the objects in use
; posn is a struct posn(x y)
(define ball (make-posn (/ window-width 2) (/ window-height 2)))
(define pad1 (make-posn pad-width (/ window-height 2)))
(define pad2 (make-posn (- window-width pad-width) (/ window-height 2)))
(define world (make-gen-world pad1 pad2 ball))

;------------------------------------------------------------
; design ball, pad and background images
(define ball-img (circle  ball-radius "solid" "green"))
(define pad-img (rectangle pad-width pad-height "solid" "green"))
(define background (empty-scene window-width window-height "black"))
   

;------------------------------------------------------------
; players scores

(define player1-score 0)
(define player2-score 0)
#|
(define score-window (new frame%
                      [width 600] [height 480]
                      [label "Score"]
                      [alignment (list 'right 'bottom)]))
(send score-window show #t)


(define p1-msg (new message%
                    [label (number->string player1-score)]
                    [parent score-window]))
(define p2-msg (new message%
                    [label (number->string player2-score)]
                    [parent score-window]))
|#                  

(define (show-scores)
  (and
   (and (and (display "Player1 Score: " ) (display player1-score)) (display "\n"))
   (and (and (display "Player2 Score: " ) (display player2-score)) (display "\n"))
   ))
(show-scores)
                      

;------------------------------------------------------------
; foreground def
(define (render t)
                    (place-images
                    (list ball-img pad-img pad-img)
                    (list ball pad1 pad2)
                    background))

;------------------------------------------------------------
; call 
;(on-tick frame (posn-x ball) (posn-y ball) (posn-y pad1) (posn-y pad2))

;------------------------------------------------------------
;ball move
(define ball-move-x -10)
(define ball-move-y -1)

(define (move-ball)
  (set-posn-y! ball (+ ball-move-y (posn-y ball)))
  (set-posn-x! ball (+ ball-move-x (posn-x ball))))


;------------------------------------------------------------
;initial state of the game


(define (state0)
  (and (and (and (and (set-posn-x! ball (/ window-width 2)) (set-posn-y! ball (/ window-height 2)))
  (and (set-posn-x! pad1 pad-width) (set-posn-y! pad1 (/ window-height 2))))
  (and (set-posn-x! pad2 (- window-width pad-width)) (set-posn-y! pad2 (/ window-height 2))))
  (set! ball-move-y -7)))
  

;------------------------------------------------------------
;GAME LOOP
(define pad1-moving 0)
(define pad2-moving 0)

(define (move t)
  
  ; pad moving on keyboard pad2 and pad1
  
  (when (equal? pad2-moving 1) (set-posn-y! pad2 (-  (posn-y pad2) pad-speed)))
  (when (equal? pad2-moving -1) (set-posn-y! pad2 (+  (posn-y pad2) pad-speed)))
  (when (equal? pad1-moving 1) (set-posn-y! pad1 (-  (posn-y pad1) pad-speed)))
  (when (equal? pad1-moving -1) (set-posn-y! pad1 (+  (posn-y pad1) pad-speed)))
  (when (< (posn-y pad2) (/ pad-height 2)) (set-posn-y! pad2 (/ pad-height 2)))
  (when (> (posn-y pad2) (- window-height (/ pad-height 2))) (set-posn-y! pad2 (- window-height (/ pad-height 2))))
  (when (< (posn-y pad1) (/ pad-height 2)) (set-posn-y! pad1 (/ pad-height 2)))
  (when (> (posn-y pad1) (- window-height (/ pad-height 2))) (set-posn-y! pad1 (- window-height (/ pad-height 2))) )

  ; top and bottom wall colision
  (when (< (posn-y ball) ball-radius) (and (set-posn-y! ball ball-radius) (set! ball-move-y (* ball-move-y -0.8))))
  
  (when (> (posn-y ball) (- window-height ball-radius)) (and (set-posn-y! ball (- window-height ball-radius)) (set! ball-move-y (* ball-move-y -0.8))))
  
  ; colision on pad2 and pad1
  (when (and (> (posn-x ball) (- (- (posn-x pad2) ball-radius) (/ pad-width 2))) ; x pad2
             (and (< (posn-y ball) (+ (posn-y pad2) (/ pad-height 2))) (> (posn-y ball) (- (posn-y pad2) (/ pad-height 2))))) ; y
        
         (and (set! ball-move-x (* ball-move-x -1.2)) (set! ball-move-y (* ball-move-y 1.2))))
    (when (and (< (posn-x ball) (+ (+ (posn-x pad1) ball-radius) (/ pad-width 2))) ; x pad1
             (and (< (posn-y ball) (+ ball-radius (+ (posn-y pad1) (/ pad-height 2)))) (> (posn-y ball) (- (- (posn-y pad1) (/ pad-height 2)) ball-radius)))) ; y
        
         (and (set! ball-move-x (* ball-move-x -1.2)) (set! ball-move-y (* ball-move-y 1.2))))
                                                                                         
         

  ; side bug fixed
  (when (and (and (> (posn-x ball) (- (- (posn-x pad2) ball-radius) (/ pad-width 2))) ; x pad2
             (< (posn-x ball) (+ (+ (posn-x pad2) ball-radius) (/ pad-width 2))) )
             (or (equal? (posn-y ball) (- (- (posn-y pad2) (/ pad-height 2)) ball-radius))
                 (equal? (posn-y ball) (+ ball-radius (+ (posn-y pad2) (/ pad-height 2))))))                                                                                    
    (and (set! ball-move-y (* ball-move-y -2))
         (set! ball-move-x (* ball-move-x -1))))
  (when (and (and (> (posn-x ball) (- (- (posn-x pad1) ball-radius) (/ pad-width 2))) ; x pad1
             (< (posn-x ball) (+ (+ (posn-x pad1) ball-radius) (/ pad-width 2))) )
             (or (equal? (posn-y ball) (- (- (posn-y pad1) (/ pad-height 2)) ball-radius))
                 (equal? (posn-y ball) (+ ball-radius (+ (posn-y pad1) (/ pad-height 2))))))                                                                                    
    (and (set! ball-move-y (* ball-move-y -2))
         (set! ball-move-x (* ball-move-x -1))))
  
  

  ; reset game when ball leave right and left side plus score add1
  (when (> (posn-x ball) (- window-width ball-radius ))
  (and (and (state0)
       (and (set! player1-score (add1 player1-score)) (show-scores)))
       (and (set! ball-move-x 10) (set! ball-move-y -1))
       ))

  (when (< (posn-x ball) ball-radius)
  (and (and (state0)
       (and (set! player2-score (add1 player2-score)) (show-scores)))
       (and (set! ball-move-x -10) (set! ball-move-y -1))
       ))
  
         
 
  
  
  (move-ball)
  )


(define (is-stopped w k)
  (cond
    [(key=? k "up") (set! pad2-moving 0)]   
    [(key=? k "down") (set! pad2-moving 0)]
    [(key=? k "w") (set! pad1-moving 0)]
    [(key=? k "s") (set! pad1-moving 0)]
    [else w]
    ))

(define (is-moving  w k)
  (cond
    [(key=? k "up") (set! pad2-moving 1)]   
    [(key=? k "down") (set! pad2-moving -1)]
    [(key=? k "w") (set! pad1-moving 1)]
    [(key=? k "s") (set! pad1-moving -1)]
    [else w]
    ))

(define (pad-borders t)
  (cond
    (equal? (posn-y pad2) 0) (set-posn-y! pad2 0)))



;------------------------------------------------------------
; big bang
(big-bang (make-posn 0 0)
  (on-draw render)
  (on-key is-moving)
  (on-tick move)
  (on-release is-stopped))


;------------------------------------------------------------
#|
missing gui to show user score

(cond
                                                                                        ((and (> (posn-y ball) (+ (posn-y pad1) (/ pad-height 16)))
                                                                                             (< (posn-y ball) (+ (posn-y pad1) (/ pad-height 8)))) 1)
                                                                                        ((and (>= (posn-y ball) (+ (posn-y pad1) (/ pad-height 8)))
                                                                                             (< (posn-y ball) (+ (posn-y pad1) (/ pad-height 4)))) 1.3)
                                                                                        ((and (>= (posn-y ball) (+ (posn-y pad1) (/ pad-height 4)))
                                                                                             (< (posn-y ball) (+ (posn-y pad1) (/ pad-height 2)))) 1.5)
                                                                                        ((equal? (posn-y ball) (+ (posn-y pad1) (/ pad-height 2))) -2)
                                                                                       
                                                                                        ((and (< (posn-y ball) (- (posn-y pad1) (/ pad-height 16)))
                                                                                             (> (posn-y ball) (- (posn-y pad1) (/ pad-height 8)))) 1)
                                                                                        ((and (<= (posn-y ball) (- (posn-y pad1) (/ pad-height 8)))
                                                                                             (> (posn-y ball) (- (posn-y pad1) (/ pad-height 4)))) 1.3)
                                                                                        ((and (<= (posn-y ball) (- (posn-y pad1) (/ pad-height 4)))
                                                                                             (> (posn-y ball) (- (posn-y pad1) (/ pad-height 2)))) 1.5)
                                                                                        ((equal? (posn-y ball) (- (posn-y pad1) (/ pad-height 2))) -2)))
(cond
                                                                                        ((and (>= (posn-y ball) (+ (posn-y pad2) (/ pad-height 16)))
                                                                                             (< (posn-y ball) (+ (posn-y pad2) (/ pad-height 8)))) 1.1)
                                                                                        ((and (>= (posn-y ball) (+ (posn-y pad2) (/ pad-height 8)))
                                                                                             (< (posn-y ball) (+ (posn-y pad2) (/ pad-height 4)))) 1.3)
                                                                                        ((and (>= (posn-y ball) (+ (posn-y pad2) (/ pad-height 4)))
                                                                                             (< (posn-y ball) (+ (posn-y pad2) (/ pad-height 2)))) 1.5)
                                                                                        ((equal? (posn-y ball) (+ (posn-y pad2) (/ pad-height 2))) -2)
                                                                                   
                                                                                        
                                                                                        ((and (<= (posn-y ball) (- (posn-y pad2) (/ pad-height 16)))
                                                                                             (> (posn-y ball) (- (posn-y pad2) (/ pad-height 8)))) 1.1)
                                                                                        ((and (<= (posn-y ball) (- (posn-y pad2) (/ pad-height 8)))
                                                                                             (> (posn-y ball) (- (posn-y pad2) (/ pad-height 4)))) 1.3)
                                                                                        ((and (<= (posn-y ball) (- (posn-y pad2) (/ pad-height 4)))
                                                                                             (> (posn-y ball) (- (posn-y pad2) (/ pad-height 2)))) 1.5)
                                                                                        ((equal? (posn-y ball) (- (posn-y pad2) (/ pad-height 2))) -2))
|#
                           
