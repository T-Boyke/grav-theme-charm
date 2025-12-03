import mermaid from 'mermaid';

var isTouch = window.DocumentTouch && document instanceof DocumentTouch;

function scrollHeader() {
    // Has scrolled class on header
    var zvalue = $(document).scrollTop();
    if (zvalue > 75)
        $("#header").addClass("scrolled");
    else
        $("#header").removeClass("scrolled");
}

function parallaxBackground() {
    $('.parallax').css('background-positionY', ($(window).scrollTop() * 0.3) + 'px');
}

jQuery(document).ready(function ($) {

    // Initialize Mermaid
    $('.language-mermaid').each(function (index, element) {
        var content = $(element).text();
        var mermaidDiv = $('<div class="mermaid">' + content + '</div>');
        $(element).parent('pre').replaceWith(mermaidDiv);
    });

    try {
        var isDark = $('html').hasClass('dark');
        var themeVars = isDark ? {
            // Dark Mode Overrides
            primaryColor: '#1f2937', // gray-800
            primaryTextColor: '#f3f4f6', // gray-100
            primaryBorderColor: '#6b7280', // gray-500
            lineColor: '#a5b4fc', // indigo-300
            secondaryColor: '#374151', // gray-700
            tertiaryColor: '#1f2937', // gray-800
            noteBkgColor: '#374151',
            noteTextColor: '#f3f4f6',
            textColor: '#f3f4f6',
            mainBkg: '#1f2937',
            darkMode: true
        } : {
            // Light Mode Defaults
            darkMode: false
        };

        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                fontFamily: 'inherit',
                ...themeVars
            }
        });
        console.log('Mermaid initialized with dark mode:', isDark);
    } catch (e) {
        console.error('Mermaid init failed:', e);
    }

    scrollHeader();

    // Scroll Events
    if (!isTouch) {
        $(document).scroll(function () {
            scrollHeader();
            parallaxBackground();
        });
    };

    // Touch scroll
    $(document).on({
        'touchmove': function (e) {
            scrollHeader(); // Replace this with your code.
        }
    });

    //Smooth scroll to start
    $('#to-start').click(function () {
        var start_y = $('#start').position().top;
        var header_offset = 45;
        window.scroll({ top: start_y - header_offset, left: 0, behavior: 'smooth' });
        return false;
    });

    //Smooth scroll to top
    $('#to-top').click(function () {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        return false;
    });

    // Responsive Menu
    $('#toggle').click(function () {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
        $('body').toggleClass('mobile-nav-open');
    });

    // Tree Menu
    $(".tree").treemenu({ delay: 300 });

    // Theme Switcher
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const html = document.documentElement;

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }

        // Update radio buttons
        themeRadios.forEach(radio => {
            if (radio.value === theme) {
                radio.checked = true;
            }
        });
    }

    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('system');
    }

    // Listen for changes
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setTheme(e.target.value);
        });
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        }
    });

});
