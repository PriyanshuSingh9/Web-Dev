<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo</title>
</head>
<style>
    body{
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: black;
        color:white;
    }
</style>
<body>
    <h1>Recommended Books</h1>

    <ul>
    <?php foreach(filter($books,'author','James Clear') as $book): ?>
        <li>
            <a href="<?= $book['url'] ?>"><?= $book['name'] ?></a>
            <p><?= $book['author'] ?></p>
            <p><?= $book['year'] ?></p>
        </li>
        <?php endforeach;?>
    </ul>

    <ul>
    <?php foreach($phpFilter as $book): ?>
        <li>
            <a href="<?= $book['url'] ?>"><?= $book['name'] ?></a>
            <p><?= $book['author'] ?></p>
            <p><?= $book['year'] ?></p>
        </li>
        <?php endforeach;?>
    </ul>
</body>
</html>