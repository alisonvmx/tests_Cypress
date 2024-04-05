describe("Teste e2e do TodoList",()=>{
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/index.html")
    });

    it('Deve ser possivel marcar uma tarefa concluída.', () => {
        cy.get('#todo_title').type('teste{enter}')
        cy.get('.form-check-input').click()
        cy.get('.form-check-input').should('be.checked');
    })

    it('Deve ser possivel desmarcar uma tarefa concluída.', () => {
        cy.get('#todo_title').type('teste{enter}')
        cy.get('.form-check-input').click()
        cy.get('.form-check-input').click()
        cy.get('.form-check-input').should('not.be.checked');
    })

    it('Deve ser possivel adicionar uma nova tarefa pressionando ENTER.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('[x-text="todo.task"]').should('have.text', 'Estudar')
    });

    it('Deve ser possivel adicionar uma nova tarefa clicando no botão "Criar tarefa".', () => {
        cy.get('#todo_title').type('trabalhar')
        cy.get('[data-cy="createdTask"]').click()
        cy.contains('trabalhar').should('be.visible');
    });

    it('Deve ser possivel remover uma tarefa.', () => {
        cy.get('#todo_title').type('teste{enter}')
        cy.get('[x-text="todo.task"]').should('have.text', 'teste')
        cy.get('.text-end > .btn').click()
        cy.contains('teste').should('not.exist');
    });

    it('Deve ser possivel filtrar tarefas concluídas.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('#todo_title').type('Ler{enter}')
        cy.get(':nth-child(3) > :nth-child(1) > .form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select(2)
        cy.contains('Ler').should('be.visible');
    });

    it('Deve ser possivel filtrar tarefas em aberto.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('#todo_title').type('Ler{enter}')
        cy.get(':nth-child(3) > :nth-child(1) > .form-check-input').click()
        cy.get('.pt-3 > .col-auto > .btn').select(1)
        cy.contains('Estudar').should('be.visible');
    });

    it('Deve ser possivel visualizar número total de tarefas.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('#todo_title').type('Ler{enter}')
        cy.get('#todo_title').type('Trabalhar{enter}')
        cy.get('.mb-3').should('have.text', 'Tarefas cadastradas: 3')

    });

    it('Deve ser possivel visualizar se o número total de tarefas é atualizado após adicionar uma tarefa.', () => {
        cy.get('.mb-3').should('have.text', 'Tarefas cadastradas: 0')
        cy.get('#todo_title').type('Trabalhar{enter}')
        cy.get('.mb-3').should('have.text', 'Tarefas cadastradas: 1')
    });
    
    it('Deve ser possivel visualizar se o número total de tarefas é atualizado após remover uma tarefa.', () => {
        cy.get('#todo_title').type('Estudar{enter}')
        cy.get('#todo_title').type('Ler{enter}')
        cy.get('#todo_title').type('Trabalhar{enter}')
        cy.get('.mb-3').should('have.text', 'Tarefas cadastradas: 3')
        cy.get(':nth-child(4) > .text-end > .btn').click()
        cy.get('.mb-3').should('have.text', 'Tarefas cadastradas: 2')
    });

    it('Deve ser possível visualizar modal de aviso ao excluir uma tarefa.', () => {
        cy.spy(win, 'confirm').as('confirmSpy');
        // Adiciona uma tarefa
        cy.get('#todo_title').type('teste{enter}');
        cy.get('[x-text="todo.task"]').should('have.text', 'teste');
    
        // Clica no botão para excluir a tarefa
        cy.get('.text-end > .btn').click();

        cy.get('@confirmSpy').should('have.been.called');

    });

})
