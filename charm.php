<?php
namespace Grav\Theme;

use Grav\Common\Grav;
use Grav\Common\Theme;

class Charm extends Theme
{
    public static function getSubscribedEvents()
    {
        return [
            'onThemeInitialized'    => ['onThemeInitialized', 0],
            'onTwigLoader'          => ['onTwigLoader', 0],
            'onTwigInitialized'     => ['onTwigInitialized', 0],
        ];
    }

    public function onThemeInitialized()
    {

    }

    // Add images to twig template paths to allow inclusion of SVG files
    public function onTwigLoader()
    {
        $theme_paths = Grav::instance()['locator']->findResources('theme://images');
        foreach($theme_paths as $images_path) {
            $this->grav['twig']->addPath($images_path, 'images');
        }
    }

    public function onTwigInitialized()
    {
        $twig = $this->grav['twig'];

        $form_class_variables = [
//            'form_outer_classes' => 'form-horizontal',
            'form_button_outer_classes' => 'mt-4 mb-4',
            'form_button_classes' => 'inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer',
            'form_errors_classes' => 'text-red-500',
            'form_field_outer_classes' => 'mb-4',
            'form_field_outer_label_classes' => 'mb-2',
            'form_field_label_classes' => 'block text-gray-700 font-bold mb-2',
            'form_field_input_classes' => 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow',
            'form_field_textarea_classes' => 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow',
            'form_field_select_classes' => 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow',
            'form_field_radio_classes' => 'mr-2 text-blue-600 focus:ring-blue-500',
            'form_field_checkbox_classes' => 'mr-2 text-blue-600 focus:ring-blue-500',
        ];

        $twig->twig_vars = array_merge($twig->twig_vars, $form_class_variables);

    }

}