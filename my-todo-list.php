<?php
/*
Plugin Name: My Todo List
Description: A simple todo list plugin with cookie storage.
Version: 1.0
Author: Your Name
*/

function my_todo_list_menu() {
    add_menu_page('Todo List', 'Todo List', 'manage_options', 'my-todo-list', 'my_todo_list_page');
}
add_action('admin_menu', 'my_todo_list_menu');

function my_todo_list_page() {
    ?>
    <div class="wrap">
        <h1 class="hding">لیست کار هاتو با خیال راحت بنویس</h1>
        <div id="about-page">
            <a href="about.html">درباره ما </a>
            <p>حتما قبل از زدن روی دکمه شروع روی دکمه درباره ما بزنید تا درباره برنامه به خوبی متوجه کار کردن آن بشوید </p>
            <button id="start-button">شروع</button>
        </div>
        <div id="todo-app" style="display:none;">
            <input type="text" id="todo-input" placeholder="موضوع کار خود را وارد کنید..."> <br>
            <button id="add-todo">ثبت</button>
            <div id="notification" style="display:none;"></div>
            <table id="todo-table">
                <thead>
                    <tr>
                        <th>تعداد</th>
                        <th>موضوع</th>
                        <th>تاریخ</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody id="todo-list"></tbody>
            </table>
        </div>
    </div>
    <link rel="stylesheet" type="text/css" href="<?php echo plugins_url('style.css', __FILE__); ?>">
    <script src="<?php echo plugins_url('script.js', __FILE__); ?>"></script>
    
    <div id="edit-modal">
        <div id="edit-modal-content">
            <h1>کار جدید خود را وارد کنید</h1>
            <input type="text" id="edit-input" placeholder="موضوع کار را وارد کنید...">
            <button id="edit-submit">ثبت</button>
        </div>
    </div>

    <script>
        document.getElementById('start-button').onclick = function() {
            document.getElementById('about-page').style.display = 'none';
            document.getElementById('todo-app').style.display = 'block';
        }
    </script>
    <?php
}
?>

<link rel="stylesheet" href="style.css">