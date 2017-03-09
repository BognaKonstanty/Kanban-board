
$(function() {


// randomString funkcja losuje 10 elementów z tablicy znaków chars i składa je w jeden string 
function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    var i = 0;
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) {
    var self = this; 

    this.id = randomString();
    this.name = name || 'Kolumna';
    this.$element = createColumn();

  function createColumn() {
    // TWORZENIE ELEMENTÓW SKŁADOWYCH KOLUMNY
    var $column = $('<div>').addClass('column');
    var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
    var $columnCardList = $('<ul>').addClass('column-card-list');
    var $columnDelete = $('<button>').addClass('btn-delete').text('x');
    var $columnAddCard = $('<button>').addClass('add-card').text('ADD TASK');


// PODPINANIE ODPOWIEDNICH ZDARZEŃ
  $columnDelete.click(function() {
    self.removeColumn();
  });
  $columnAddCard.click(function() {
    self.addCard(new Card(prompt("Wpisz nazwę karty")));
  });


// KONSTRUOWANIE ELEMENTU KOLUMNY
  $column.append($columnTitle)
    .append($columnDelete)
    .append($columnAddCard)
    .append($columnCardList);


// ZWRACANIE STWORZONEJ  KOLUMNY
  return $column;
  }
}

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
};

function Card(description) {
  var self = this;

  this.id = randomString();
  this.description = description;
  this.$element = createCard();
  
  function createCard() {
    var $card = $('<li>').addClass('card');
    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    var $cardDelete = $('<button>').addClass('btn-delete').text('x');


  $cardDelete.click(function() {
        self.removeCard();
  });

  $card.append($cardDelete).append($cardDescription);

  return $card;
  }
}

Card.prototype = {
  removeCard: function() {
    this.$element.remove();
  }
};

var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
};


function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column').click(function() {
  var name = prompt('Wpisz nazwę kolumny');
  var column = new Column(name);
   board.addColumn(column);
  });


var todoColumn = new Column('to do');
var doingColumn = new Column('doing');
var doneColumn = new Column('done');

board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

var card1 = new Card('new task');
//var card2 = new Card('Stworzyc tablice kanban');

todoColumn.addCard(card1);
doingColumn.addCard(card2);

})
