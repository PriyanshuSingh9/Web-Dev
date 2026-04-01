<?php
$books = [
    [
        'name' => "Atomic Habits",
        'author' => "James Clear",
        'year' => 2018,
        'url' => "http://example.com"
    ],
    [
        'name' => "The Pragmatic Programmer",
        'author' => "Andrew Hunt",
        'year' => 1999,
        'url' => "http://example.com"
    ],
    [
        'name' => "Clean Code",
        'author' => "Robert C. Martin",
        'year' => 2008,
        'url' => "http://example.com"
    ],
    [
        'name' => "Design Patterns",
        'author' => "Erich Gamma",
        'year' => 1994,
        'url' => "http://example.com"
    ]
];


function filter($items,$field,$value){
    $filteredItems=[];
    foreach($items as $item){
        if($item[$field]===$value){
            $filteredItems[]=$item;
        }   
    }
    return $filteredItems;
}

function customFilter($items,$fn){
    $filteredItems=[];
    foreach($items as $item){
        // if each item satisfies the condition in $fn
        // add to filtered array
        if($fn($item)){
            $filteredItems[]=$item;
        }
    }
    return $filteredItems;
}
$filteredItems=customFilter($books,function($book){
    return $book['year']>=2000;
});

$phpFilter=array_filter($books,function($book){
    return $book['year']>=2000;
});

require "index.view.php";