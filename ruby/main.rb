module Mover
    module ClassMethods
        
    end

    module InstanceMethods
        def jump(diff)
            @position.move(diff)
        end
    end

    def self.included(receiver)
        receiver.extend         ClassMethods
        receiver.send :include, InstanceMethods
    end
end

class Man
    include Mover
end

class Woman
    include Mover
    def initialize()
        @position = Position.new
    end
end

class Position
    def initialize()
        @position = 0
    end
    def position
        @position
    end
    def position=(value)
        @position = value
    end
    def move(diff)
        @position += diff
    end
end

a = Woman.new
puts a.jump 10
puts a.jump -10