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

    // Store original mermaid content
    var mermaidCache = [];
    $('.language-mermaid').each(function (index, element) {
        mermaidCache.push({
            element: element,
            content: $(element).text()
        });
    });

    var renderTimeout;
    function renderMermaid() {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(function () {
            _renderMermaidActual();
        }, 100);
    }

    function _renderMermaidActual() {
        var isDark = $('html').hasClass('dark');
        console.log('Rendering Mermaid. Dark mode:', isDark);

        // Reset blocks to raw state
        mermaidCache.forEach(function (item) {
            // Create new container with raw content
            var mermaidDiv = $('<div class="mermaid">' + item.content + '</div>');

            // Find the current instance in the DOM
            if (document.body.contains(item.element)) {
                $(item.element).replaceWith(mermaidDiv);
                item.element = mermaidDiv[0];
            } else {
                // Try to find it by context if reference is lost (e.g. inside a container that was modified)
                // For now, we assume the reference is valid or the element is gone.
                // If gone, we can't do much.
            }
        });

        // Re-initialize configuration
        mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
            themeVariables: isDark ? {
                darkMode: true,
                primaryColor: '#1f2937',
                primaryTextColor: '#f3f4f6',
                primaryBorderColor: '#6b7280',
                lineColor: '#a5b4fc',
                secondaryColor: '#374151',
                tertiaryColor: '#1f2937',
                noteBkgColor: '#374151',
                noteTextColor: '#f3f4f6',
                textColor: '#f3f4f6',
                mainBkg: '#1f2937'
            } : {
                darkMode: false
            }
        });

        // Run Mermaid on the new elements
        var nodesToProcess = mermaidCache.map(function (item) { return item.element; }).filter(function (el) { return document.body.contains(el); });

        if (nodesToProcess.length > 0) {
            mermaid.run({
                nodes: nodesToProcess
            }).catch(function (e) {
                console.error('Mermaid run failed:', e);
            });
        }
    }

    // Initial Render
    renderMermaid();

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

        // Re-render Mermaid on theme change
        renderMermaid();
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
            renderMermaid();
        }
    });

});
